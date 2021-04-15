# Product-Database
Back End Project
Storing the data for the products

Project Catwalk is the web portal for a retail apparel store.  This project adds production level traffic to the front end that was constructed in the Project Catwalk repository.  This back-end architecture stored millions of records in PostgreSQL and utilized indexed queries in order to reduce response latency.  The final projcet consisted of one entry point to an NginX load balancer feeding three horizontally scaled server instances all quering the same PostgreSQL database hosted on multiple AWS EC2 instances.  The production throughtput for this architecture was over 2500 requests per second with a latency of less than 500 ms with 0% errors.

Built with:
* [JavaScript](https://www.javascript.com/)
* [Axios](https://www.npmjs.com/package/axios)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [AWS (EC2)](https://aws.amazon.com/)
* [Docker](https://www.docker.com/)
* [Nginx](https://nginx.org/en/docs/)

Testing:
* [Postman](https://www.postman.com/)
* [K6](https://k6.io/)
* [Loader.io](https://loader.io/)

Requirements
=============
<h3>Installing Dependencies</h3>

From within the root directory:<br>
`npm install`

Development
=============
From within the root directory:

To run server<br>
`npm start`

