import http from 'k6/http';
import { check, sleep } from 'k6';


export default function () {
  const baseUrl = 'https://stg-api-gw.pillar-app.com/daroan/public/api/v1/auth/login';
  const bodyData = JSON.stringify({
    email: 'hasib17@t.com',
    password: 'T123456@'
  });

  const headersData = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ''
    },
  };

  const response = http.post(baseUrl, bodyData, headersData);

  if (check(response, {
    'Status & Error is': (r) => r.status == 200 && r.error == false
  })) {
    check(response, {
      'Message Verify that': (r) => r.body.includes('User info returned successfully'),
      'Label verify that': (r) => r.json().data.access_level.includes('HOME')
    });
  }


  sleep(1);
}

// k6 run --vus 100 --duration 30s