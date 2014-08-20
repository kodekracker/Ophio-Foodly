from fabric.api import local, env


def setup():
    local('npm install')
    local('sudo npm install bower -g')
    local('bower install')


def build():
    setup()
    local('grunt build')


def serve():
    local('grunt serve')


def deploy():
    build()
    local('git push')
    local('ghp-import -p -m "site upated" dist/')
