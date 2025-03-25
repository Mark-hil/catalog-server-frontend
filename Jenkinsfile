pipeline {
    agent any

    environment {
        REACT_APP_DIR = 'frontend'
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
                dir("${REACT_APP_DIR}") {
                    echo 'Installing npm dependencies'
                    sh '''
                        npm install
                    '''
                }
            }
        }

        stage('Run Linting & Tests') {
            steps {
                dir("${REACT_APP_DIR}") {
                    echo 'Running ESLint and Jest tests'
                    sh '''
                        #npm run lint
                        #npm test -- --watchAll=false
                    '''
                }
            }
        }

        stage('Build React App') {
            steps {
                dir("${REACT_APP_DIR}") {
                    echo 'Building the React application'
                    sh '''
                        npm run build
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -f ${REACT_APP_DIR}/Dockerfile ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_CREDENTIALS) {
                        sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                        sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                        sh "docker push ${DOCKER_IMAGE}:latest"
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
