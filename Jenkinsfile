pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
        GITHUB_CREDENTIALS = credentials('github-credentials-id')
    }

    stages {
        stage('Clone repository') {
            steps {
                git branch: 'master', credentialsId: 'github-credentials-id', url: 'https://github.com/SatishKumar276/pythonapp.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("satishchaitu/pythonimage:${env.BUILD_ID}")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB_CREDENTIALS') {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy Docker Container') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                    docker pull satishchaitu/pythonimage:${BUILD_ID}
                    docker stop my_app || true
                    docker rm my_app || true
                    docker run -d --name my_app -p 80:80 satishchaitu/pythonimage:${BUILD_ID}
                    '''
                }
            }
        }
    }
}
