from http.server import HTTPServer, BaseHTTPRequestHandler
import face_recognition


class Service(BaseHTTPRequestHandler):
    def do_POST(self):
        content_len = int(self.headers.getheader('content-length', 0))
        post_body = self.rfile.read(content_len)
        

httpd = HTTPServer(('localhost', 5000), Service)
httpd.serve_forever()
