import { User } from './models/User'
import { Address } from './models/Address'
import { workersExampleDatastore } from './datastores/workersExampleDatastore'
import { SearchStrategy } from 'kv-orm'

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const params = url.searchParams;

  let user;
  switch(url.pathname) {
    case '/':
      return new Response(`<html><body><h1>kv-orm-cf-workers Example</h1></body></html>`, { headers: { 'Content-Type': 'text/html' }});
    case '/createUser':
      const address = new Address('123 Main Street', 'Anytown', 'USA', '12345');
      address.zipCode = '12345';

      user = new User();
      user.firstName = 'John';
      user.lastName = 'Doe';
      user.addresses = [address];

      return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' }})
    case '/getUser':
      user = await User.get(params.get('uuid'));

      console.log(user);

      return new Response(`${user.uuid}: (firstName: ${await user.firstName}, lastName: ${await user.lastName})`, { headers: { 'Content-Type': 'text/plain' }})
    case '/listUser':
      const results = await workersExampleDatastore.search({ term: '', strategy: SearchStrategy.prefix })

      console.log(results);

      return new Response('Check the console');
    case '/writeTwoSoft':
      await workersExampleDatastore.write('onesoft', 'one');
      await workersExampleDatastore.write('twosoft', 'two');

      return new Response('Done.');
    case '/awaitThings':
      const a = new User()
      await (a.firstName = 'greg')
      await (a.lastName = 'joe')
      const b = new Address('123 Main Street', 'Anytown', 'USA', '12345');
      await (a.addresses = [b]);

      return new Response('Done.');
    case '/listAll':
      const r = await workersExampleDatastore.search({ term: '', strategy: SearchStrategy.prefix })
      const m: { [key: string]: any } = {};
      let h = `<html><body><h1>List</h1><ul>`

      for (let i = 0; i < r.keys.length; i++) {
        m[r[i]] = await workersExampleDatastore.read(r[i]);
        h += `<li>${r.keys[i]} - ${m[r.keys[i]]}</li>`;
      }

      h += `</ul></body></html>`


      return new Response(h, { headers: { 'Content-Type': 'text/html' }});
    case '/deleteAll':
      const allResults = await workersExampleDatastore.search({ term: '', strategy: SearchStrategy.prefix })

      allResults.keys.forEach(key => workersExampleDatastore.delete(key));

      for (let i = 0; i < allResults.keys.length; i ++) {
        workersExampleDatastore.delete(allResults.keys[i]);
      }

      return new Response('Wait a minute: ' + allResults.keys.length);
    default:
      return new Response('404 Not Found', { status: 400 });
  }
}
