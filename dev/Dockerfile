# Base image for Codespaces
FROM mcr.microsoft.com/devcontainers/universal:linux

# Update and install Redis Stack
RUN sudo apt-get install lsb-release curl gpg
RUN curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
RUN sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
RUN sudo apt-get update
RUN sudo apt-get install redis-stack-server

# Expose Redis port
EXPOSE 6379

# Start Redis Stack server when the container runs
CMD ["redis-stack-server", "--bind", "0.0.0.0"]
