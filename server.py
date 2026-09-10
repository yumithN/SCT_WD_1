import os
import sys

def main():
    port = 3000
    print(f"Starting server on port {port}...")
    try:
        from livereload import Server
        server = Server()
        server.watch("*.html")
        server.watch("css/*.css")
        server.watch("js/*.js")
        print(f"LiveReload server active at http://localhost:{port}")
        server.serve(port=port, host="127.0.0.1")
    except ImportError:
        import http.server
        import socketserver
        print(f"livereload not found, using standard http.server on port {port}")
        Handler = http.server.SimpleHTTPRequestHandler
        with socketserver.TCPServer(("127.0.0.1", port), Handler) as httpd:
            print(f"Serving at http://localhost:{port}")
            httpd.serve_forever()

if __name__ == "__main__":
    main()
