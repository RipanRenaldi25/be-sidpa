pipeline {
    agent any
    
    environment {
        ADM_PW="admin1"
        SECRET_REFRESH_TOKEN="refreshtokenrahasia"
        SECRET_ACCESS_TOKEN="accesstokenrahasia"
        DB_HOST="34.101.186.158"
        VM_IP1="10.230.0.18"
        VM_IP2="10.250.0.7"
    }
    
    triggers {
        pollSCM '* * * * *'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/RipanRenaldi25/be-sidpa.git', credentialsId: 'github-auth']])
            }
        }
        stage('build'){
            steps {
                sh '''
                    docker build -t node-build:latest --target=build .
                    docker images
                '''
            }
        }
        stage('test') {
            steps {
                sh '''
                    docker build -t node-test:latest --target=test .
                    docker images
                '''
            }
        }
        stage('package') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-auth', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u $DOCKER_USERNAME --password-stdin
                        docker build -t $DOCKER_USERNAME/node-app:latest --target=deploy .
                        docker push $DOCKER_USERNAME/node-app:latest
                    '''
                }
            }
        }
        stage('deploy') {
            steps {
                withCredentials([
                    sshUserPrivateKey(credentialsId: 'be-vm', keyFileVariable: 'PRIVATE_KEY', usernameVariable: 'USERNAME'),
                    usernamePassword(credentialsId: 'docker-auth', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD'),
                    usernamePassword(credentialsId: 'db-auth', usernameVariable: 'DB_USERNAME', passwordVariable: 'DB_PASSWORD')
                ]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -i $PRIVATE_KEY $USERNAME@$VM_IP1 """
                            sudo docker ps
                            sudo docker images
                            sudo docker rm -f node-app
                            sudo docker image rm -f $DOCKER_USERNAME/node-app:latest
                            sudo docker pull $DOCKER_USERNAME/node-app:latest
                            sudo docker run -dp 80:5000 -e ADM_PW=$ADM_PW -e SECRET_REFRESH_TOKEN=$SECRET_REFRESH_TOKEN -e SECRET_ACCESS_TOKEN=$SECRET_ACCESS_TOKEN -e DATABASE_URL='postgresql://$DB_USERNAME:$DB_PASSWORD@$DB_HOST:5432?schema=public' --name node-app $DOCKER_USERNAME/node-app:latest
                            sudo docker ps
                        """
                        ssh -o StrictHostKeyChecking=no -i $PRIVATE_KEY $USERNAME@$VM_IP2 """
                            sudo docker ps
                            sudo docker images
                            sudo docker rm -f node-app
                            sudo docker image rm -f $DOCKER_USERNAME/node-app:latest
                            sudo docker pull $DOCKER_USERNAME/node-app:latest
                            sudo docker run -dp 80:5000 -e ADM_PW=$ADM_PW -e SECRET_REFRESH_TOKEN=$SECRET_REFRESH_TOKEN -e SECRET_ACCESS_TOKEN=$SECRET_ACCESS_TOKEN -e DATABASE_URL='postgresql://$DB_USERNAME:$DB_PASSWORD@$DB_HOST:5432?schema=public' --name node-app $DOCKER_USERNAME/node-app:latest
                            sudo docker ps
                        """
                    '''
                }
            }
        }
    }
}