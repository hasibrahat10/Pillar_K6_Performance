import http from 'k6/http';
import { check, sleep } from 'k6';


export default function () {
    const baseUrl = 'https://stg-api-gw.pillar-app.com/core/private/api/v2/user/basic-info';

    const headersData = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjU0NjExOTQ0LCJqdGkiOiJlYzM2NjNlYy00YTVjLTQ5OTMtYjMzNy04N2I2ODBjZTMyMDQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiZTY2NjY5NmMtYmE1Mi00YzI0LTliZjYtZDZhNzhhMzdiMzQ5IiwibmJmIjoxNjU0NjExOTQ0LCJpc3MiOiJRaU9qRTJNRFE1T1RFMk1EWXNJbTVpWmlJNk1UWXdORGs1TVRZd05pd2lhblJwSWpvaU9UTmxORGt6TjJJdFpqQmhPQzAwTkdKakxUazVNVFV0TmpReFl6WmlNREJsT1Rrd0lpd2laWGh3SWpveE5qQTFOVGsyTkRBMkxDSnBaR1Z1ZEdsMGVTSTZNaXdpWm5KbGMyZ2lPbVpoYkhObExDSjBlWEJsSWpvaVlXTmpaWE56SWl3aWEiLCJleHAiOjE2NTcwMzQzMjQsInN1YnNjcmlwdGlvbl9zdGF0dXMiOiJQUk8iLCJpZGVudGl0eSI6ImU2NjY2OTZjLWJhNTItNGMyNC05YmY2LWQ2YTc4YTM3YjM0OSJ9.Je7OL5MSXtaG7_oMIwJ3u-gqASuEvpvbuT-2lgWsxFcdwJ5q40LlqASE07iROJIbzy84Gz0FzF33EvRO3ToZgWFTn4w3zH9VKc5D0y99Z4rbCGWMLOD-V_KrkriQLV1ZDHccvO-AZe9huY25DvbAwGGgyHdQ_1IBENB4d-OtOGxjl4NQaBYndqifNdxAEw7mQ9oIbeUiFoW0708seMscKR4ZKbAFUPPEOodmYxHWOk6JUF-etWqQxeHYfwZNpEp4pn-Af8UXBeGWOByo9Npl4JFAEdmMdxyq0vJFyNLuBqj9Ectdt1iirLr2C4s7a3zgiBqfBT70Tkl0YCYuRVRrWg'
        },
    };

    const response = http.get(baseUrl, headersData);

    if (check(response, { 'Status & Error is': (r) => r.status == 200 && r.error == false })) {
        check(response, {
            'Message Verify that': (r) => r.body.includes('Returned data Successfully'),
            'Email is hasib17': (r) => r.json().data.email.includes('hasib17@t.com'),
            'Timezone is Australian CT': (r) => r.json().data.timezone.timezone_name.includes('Australian Central Time'),
            'Timezone offset is 9 hour behind': (r) => r.json().data.timezone.timezone_offset.includes('+9:30')
        });
    }

    sleep(1);
}