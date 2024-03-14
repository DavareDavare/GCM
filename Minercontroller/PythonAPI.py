import http.server
import subprocess
import json
import threading
from whatsminer import WhatsminerAccessToken, WhatsminerAPI


def run_command_with_timeout(command, ip, timeout_sec):
    try:
        proc = subprocess.Popen(f"echo -n {command} | nc {ip} 4028", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        timer = threading.Timer(timeout_sec, proc.kill)
        timer.start()
        stdout, stderr = proc.communicate()
        timer.cancel()
        return stdout.decode(), stderr.decode(), proc.returncode
    except TimeoutError as e:
        return "", str(e), None
    except Exception as e:
        return "", str(e), None


def Antminer(command, ip):
    try:
        # Run shell command with timeout of 1 minute (60 seconds)
        stdout, stderr, returncode = run_command_with_timeout(command, ip, 60)

        if stdout.strip() == "":
            return {
                'success': False,
                'error': "No output after 1 minute"
            }
        else:
            return {
                'success': True,
                'output': stdout,
                'error': stderr
            }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }


def Whatsminer(command, ip):
    try:
        token = WhatsminerAccessToken(ip_address=ip,
                                      admin_password="crypt0rule5#")
        if command == "power_off":
            summary_json = WhatsminerAPI.get_read_only_info(access_token=token, cmd=command,
                                                            additional_params={"respbefore": "true"})
        else:
            summary_json = WhatsminerAPI.get_read_only_info(access_token=token, cmd=command)
        return {
            'success': True,
            'message': f'Function executed with IP: {ip}'
        }
    except TimeoutError as e:
        return {
            'success': False,
            'error': str(e)
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }


class MyRequestHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path.lower() == '/restartantminer':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            ip = json.loads(post_data).get('ip', '')
            response = Antminer("Restart", ip)
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())

        elif self.path.lower() == '/restartwhatsminer':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            ip = json.loads(post_data).get('ip', '')
            response = Whatsminer("restart_btminer", ip)
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())

        # -----------------------------------------Stop Methoden
        elif self.path.lower() == '/stopwhatsminer':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            ip = json.loads(post_data).get('ip', '')
            response = Whatsminer("power_off", ip)
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())

        elif self.path.lower() == '/stopantminer':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            ip = json.loads(post_data).get('ip', '')
            response = Antminer("Quit", ip)
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())

        else:
            self.send_error(404)


def run_server():
    server_address = ('', 8000)
    httpd = http.server.HTTPServer(server_address, MyRequestHandler)
    print('Server running on port 8000...')
    httpd.serve_forever()


if __name__ == '__main__':
    run_server()
