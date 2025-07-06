pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                git branch: 'master',
                    credentialsId: 'githubtoken',
                    url: 'https://github.com/srishailam-guniganti/react-todo-app.git'
            }
        }
    }
}
