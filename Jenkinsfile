// pipeline {
//     agent any
    
//     triggers {
//         pollSCM '* * * * *'
//     }
    
//     stages {
//         stage('Checkout') {
//             steps {
//                 checkout scmGit(branches: [[name: '*/main']], userRemoteConfigs: [[credentialsId: 'github-auth', url: 'https://github.com/RipanRenaldi25/be-sidpa.git']])
//                 sh 'pwd && ls -l'
//             }
//         }
//         stage('Build') {
//             steps {
//                 sh '''
//                     docker image prune
//                     docker container prune
//                     docker build -t node-build:v1.0.0 --target=build .
//                     docker images
//                 '''
//             }
//         }
//         stage('test') {
//             steps {
//                 sh '''
//                     docker build -t node-test:v1.0.0 --target=test .
//                 '''
//             }
//         }
//         stage('package') {
//             steps {
//                 withCredentials([usernamePassword(credentialsId: 'docker-auth', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
//                     sh '''
//                         echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
//                         docker build -t $DOCKER_USERNAME/node-app:v1.0.0 --target=deploy .
//                     '''
//                 }
//             }
//         }
//     }
// }

pipeline {
    agent any

    triggers {
        pollSCM '* * * * *'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], userRemoteConfigs: [[credentialsId: 'github-auth', url: 'https://github.com/RipanRenaldi25/be-sidpa.git']])
            }
        }
        stage('Build') {
            steps {
                sh '''
                    docker build -t node-build:v1.0.0 --target=build .
                    docker images
                '''
            }
        }
        stage('test') {
            steps {
                sh '''
                    docker build -t node-test:v1.0.0 --target=test .
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
    }
}