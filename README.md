# Wanna clone & deploy on EC2 Amazon Linux?
I simplified process

```markdown
# Wanna Clone & Deploy on EC2 Amazon Linux?

I simplified the process of deploying a Next.js application on an Amazon Linux EC2 instance. Follow the steps below to quickly set up your environment and get your application running.

## Prerequisites

Before you begin, ensure you have the following:

- An AWS account.
- An Amazon EC2 instance running Amazon Linux.
- SSH access to your EC2 instance.
- Basic knowledge of using the terminal and Git.

## Steps to Clone & Deploy

### 1. Connect to Your EC2 Instance

First, connect to your EC2 instance using SSH. Replace `your-key.pem` and `ec2-user@your-ec2-public-ip` with your actual key file and public IP address.

```bash
ssh -i your-key.pem ec2-user@your-ec2-public-ip
```

### 2. Create and Run the Deployment Script

Once connected to your EC2 instance, follow these steps:

1. Open a new file using `vim` to create the deployment script:
   ```bash
   vim deploy_aws.sh
   ```

2. Copy and paste the deployment script content into `deploy_aws.sh` using Vim. Once you've pasted the content, save and exit Vim by pressing `ESC`, typing `:wq`, and hitting `ENTER`.

3. Make the script executable:
   ```bash
   chmod +x deploy_aws.sh
   ```

4. Run the script:
   ```bash
   ./deploy_aws.sh
   ```

### 3. Wait for Deployment to Complete

After running the script, wait for 1-2 minutes. The script will automatically install all dependencies, configure Nginx, and deploy your Next.js application. Once the process is complete, you'll see the message:

```bash
Next.js deployment setup completed successfully.
```

### 4. Access Your Application

Once the deployment is complete, you can access your Next.js application by entering your EC2 instance's public IP address or domain name in a web browser.

## Customizing Nginx Configuration

Make sure to update the `server_name` directive in the Nginx configuration to reflect your domain or the public IP address of your EC2 instance. You can edit the Nginx configuration file using:

```bash
sudo nano /etc/nginx/conf.d/nextjs.conf
```

After making changes, restart Nginx to apply them:

```bash
sudo systemctl restart nginx
```

## Conclusion

You have now successfully cloned and deployed your Next.js application on an Amazon Linux EC2 instance! If you encounter any issues, check the logs for PM2 or Nginx for troubleshooting.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- AWS for providing the EC2 service.
- Node.js and PM2 for making server-side JavaScript easier.
- Nginx for acting as a powerful reverse proxy.

This `README.md` provides clear instructions and details about deploying your Next.js application on an Amazon Linux EC2 instance.
