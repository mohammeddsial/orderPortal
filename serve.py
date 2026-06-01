from livereload import Server

server = Server()
server.watch("index.html")
server.watch("style.css")
server.watch("images/")
server.serve(port=5500, root=".")