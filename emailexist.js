import http from 'k6/http';
import { check, sleep } from 'k6';

// export const options = {
//   vus: 5,
//   duration: '10s',
// };

export default function () {
  const baseUrl = 'https://stg-api-gw.pillar-app.com/daroan/public/api/v1/auth/login';
  const bodyData = JSON.stringify({
    email:'hasib17@t.com',
    password:'T123456@'
  });

  const headersData = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ''
    },
  };

  const response = http.post(baseUrl, bodyData, headersData);
  check(response, { 'Status code is 200': (r) => r.status == 200, 
                    'Message Verify that': (r) => r.body.includes ('User info returned successfully')
 }); // Multiple checks
  // check(response, { 'Message Verify that': (r) => r.body.includes ('User info returned successfully') });
  // check(response, {'Label verify that':(r)=> r.json().data.access_level.includes('HOME')});

  sleep(1);
}