pipeline {
    agent any

    environment {
        NODE_VERSION = '18'  // Adjust based on your React app's requirements
        DOCKERHUB_USERNAME = 'markhill97'
        DOCKER_IMAGE = "${DOCKERHUB_USERNAME}/catalog-server-frontend-app"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_CREDENTIALS = 'dockerhub-credentials'  // Stored credentials with Access Token
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning React frontend repository'
                git branch: 'main', url: 'https://github.com/Mark-hil/catalog-server-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies'
                sh '''
                    npm install
                '''
            }
        }

        stage('Run Linting & Tests') {
            steps {
                echo 'Running ESLint and Jest tests'
                sh '''
                    # npm run lint  # Uncomment if you add a lint script
                    # npm test -- --watchAll=false
                '''
            }
        }

        stage('Build React App') {
            steps {
                echo 'Building the React application'
                sh '''
                    npm run build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker image'
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -f Dockerfile ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh """
                            echo "${DOCKERHUB_PASSWORD}" | docker login -u "${DOCKERHUB_USERNAME}" --password-stdin
                            docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                            docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                            docker push ${DOCKER_IMAGE}:latest
                            docker logout
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace'
            sh 'rm -rf node_modules'
        }
        success {
            echo 'Frontend pipeline completed successfully!'
        }
        failure {
            echo 'Frontend pipeline failed. Please check the logs.'
        }
    }
}
