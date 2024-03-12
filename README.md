# Implementing CI/CD pipeline using github actions 

**1. Create an EC2 instance** 

    Name : fracspace-devops-practice

**2. Goto Settings in Github repository.**

    Click on Actions
       -Go to runners-
       -Click on new runner-
**3. Follow Instructions as mentioned over there.**
 > Download
 - Create a Folder
    
        mkdir actions-runner-backend && cd actions-runner-backend

 - Download the latest runner package


        curl -o actions-runner-linux-x64-2.314.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.314.1/actions-runner-linux-x64-2.314.1.tar.gz 

 - [uptional] Validate the hash

        echo "6c726a118bbe02cd32e222f890e1e476567bf299353a96886ba75b423c1137b5     actions-runner-linux-x64-2.314.1.tar.gz" | shasum -a 256 -c
 - Extract the installer

        tar xzf ./actions-runner-linux-x64-2.314.1.tar.gz
    
> Configuration

- Create The runner and Start the configuration Experience

        ./config.sh --url https://github.com/fracspaceBackend/Fracspace_backend --token BFS*3OXAB3H6LOPWPETMI3L*6AB*U
- This runner will have the following labels 

            ``` - Self-hosted
                - Linux 
                - X64
            ```

>   sudo ./svc.sh install 

>   Running action-runner with this command 
- *sudo ./svc.sh start*
 
**4. Create Github secrete variables**

    1 Goto settings
    2 Security ⬇️
        > Secretes and Variables ⬇️
            > Actions 
             > Create a `.env` file over them and dump ur secretes and save it.

- Goto Actins >> Configure Node.js

- It creates a `.github/workflows/nodejs.yml` file in `master` branch
- Edit yml file as per your use case

- remove last two options 
    - add this two commands

        -run: |
            touch .env
            echo  "${{secrets.PROD}}"        \[NAME OF THE ENV FILE]


**5. Navigate to Codebase folder on EC2 instance**
> cd _work
    >cd Fracspace_backend
      - check .env file 
        insert required keys if its empty
> on ec2 instance 
- install node.js

            curl -fsSL https://deb.nodesource.com/setup.lts.x | sudo -E bash -

            sudo apt-get install -y node.js

- check versions

            > node -v
            > npm -v


- install Nginx 

            sudo apt-get install -y nginx

- install pm2 process manager

            sudo npm i -g pm2

- confirm `pm2` installations
     
     > pm2

- configure Nginx with proxy information

> cd /etc/nginx/sites-available

> sudo nginx -s reload

- restart nginx 

            > sudo systemctl restart nginx

> start processor

            pm2 start index.js  --name=BackendApi

- make changes
            cd /etc/nginx/sites-available

            sudo nano default

                 location / {
            proxy_pass http://localhost:8003;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

- restart nginx

            sudo systemctl restart nginx

- make changes in yml github actions

    append : 
             
             -run : 
                pm2 restart BackendApi 






















