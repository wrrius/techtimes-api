# techtimes-api
Typescript-Express API powering the TechTimes website 🚀

## Setup 

1. Clone the repository
```shell script
git clone https://github.com/sitechtimes/techtimes-api
```

2. Create a dotenv file
```dosini
JWT_KEY=[INSERT DEV JWT_KEY HERE]
MONGO_URI=[INSERT DEV MONGO_URI HERE]
EMAIL_USER=[INSERT DEV EMAIL_USER HERE]
EMAIL_PASSWORD=[INSERT DEV EMAIL_PASSWORD HERE]
```

3. Install dependencies for all services
```bash
bash scripts/npm-install.sh
```

4. Start running the services using dep-gateways bash script
```bash
bash scripts/dep-gateways.sh -s [env]
```