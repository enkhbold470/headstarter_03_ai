#!/bin/bash

# Update the package list
sudo yum update -y

# Install Node.js and npm (using NodeSource)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify Node.js and npm installation
node -v
npm -v

# Install PM2 to manage the Next.js application process
sudo npm install -g pm2

# Install Nginx for reverse proxy
sudo yum install nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Adjust Nginx configuration
sudo rm /etc/nginx/conf.d/default.conf
cat <<EOL | sudo tee /etc/nginx/conf.d/nextjs.conf
server {
    listen 80;
    server_name your_domain_or_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

# Restart Nginx to apply the changes
sudo systemctl restart nginx

# Allow HTTP and HTTPS through the firewall (if applicable)
sudo firewall-cmd --zone=public --permanent --add-service=http
sudo firewall-cmd --zone=public --permanent --add-service=https
sudo firewall-cmd --reload

# Install Git
sudo yum install -y git

# Clone your Next.js project from GitHub
git clone https://github.com/enkhbold470/headstarter_03_ai.git
cd headstarter_03_ai

# Install project dependencies
npm install

# Build the Next.js project
npm run build

# Start the Next.js application using PM2
pm2 start npm --name "nextjs" -- start

# Configure PM2 to start on boot
pm2 startup systemd
pm2 save

echo "Next.js deployment setup completed successfully."
