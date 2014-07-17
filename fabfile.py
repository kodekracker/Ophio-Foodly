from fabric.api import local, env


def setup():
    local('npm install')
    local('sudo npm install bower -g')
    local('bower install')


def build():
    local('grunt build')


def serve():
    local('grunt build')


def deploy():
    build()
    local('ghp-import -p -m "site upated" dist/')
