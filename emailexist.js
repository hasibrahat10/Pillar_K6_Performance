import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const baseUrl = 'https://stg-api-gw.pillar-app.com/daroan/public/api/v1/auth/email-status';
  const bodyData = JSON.stringify({
    email: 'hasib17@t.com'
  });

  const headersData = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ''
    },
  };

  const response = http.post(baseUrl, bodyData, headersData);

  if (check(response, { 'Status & Error is': (r) => r.status == 200 && r.error == false })) {
    check(response, {
      'Message verify that': (r) => r.body.includes('user email status returned successfully'),
      'Active user verify that ': (r) => r.json().data.is_active == true
    });
  }

  sleep(1);
}

// k6 run --vus 100 --duration 30s