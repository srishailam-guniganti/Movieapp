pipeline {
    agent any

    environment {
        REGION = 'us-central1'
        REPO = 'first-repo'
        IMAGE_NAME = 'moviemania-app'
    }

    stages {
        stage('Clone from GitHub') {
            steps {
                git branch: 'master',
                    credentialsId: 'githubtoken',
                    url: 'https://github.com/srishailam-guniganti/react-todo-app.git'
            }
        }

        stage('Authenticate to Google Cloud') {
            steps {
                withCredentials([
                    file(credentialsId: 'gcp-service-account', variable: 'GOOGLE_APPLICATION_CREDENTIALS'),
                    string(credentialsId: 'gcp-project-id', variable: 'PROJECT_ID')
                ]) {
                    bat '''
                        gcloud auth activate-service-account --key-file=%GOOGLE_APPLICATION_CREDENTIALS%
                        gcloud config set project %PROJECT_ID%
                        gcloud auth configure-docker %REGION%-docker.pkg.dev
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                withCredentials([string(credentialsId: 'gcp-project-id', variable: 'PROJECT_ID')]) {
                    bat '''
                        set IMAGE_URI=%REGION%-docker.pkg.dev/%PROJECT_ID%/%REPO%/%IMAGE_NAME%:latest
                        docker build -t %IMAGE_URI% .
                    '''
                }
            }
        }

        stage('Push to Artifact Registry') {
            steps {
                withCredentials([string(credentialsId: 'gcp-project-id', variable: 'PROJECT_ID')]) {
                    bat '''
                        set IMAGE_URI=%REGION%-docker.pkg.dev/%PROJECT_ID%/%REPO%/%IMAGE_NAME%:latest
                        docker push %IMAGE_URI%
                    '''
                }
            }
        }

        stage('Deploy to Cloud Run') {
            steps {
                withCredentials([string(credentialsId: 'gcp-project-id', variable: 'PROJECT_ID')]) {
                    bat '''
                        set IMAGE_URI=%REGION%-docker.pkg.dev/%PROJECT_ID%/%REPO%/%IMAGE_NAME%:latest
                        gcloud run deploy %IMAGE_NAME% --image=%IMAGE_URI% --platform=managed --region=%REGION% --allow-unauthenticated
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Successfully deployed to Cloud Run!"
        }
        failure {
            echo "❌ Deployment failed. Check the console output."
        }
    }
}

