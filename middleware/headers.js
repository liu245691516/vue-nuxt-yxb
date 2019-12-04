
import axios from 'axios'
export default function({req,res}) {
    var cookies = {};
    try {
        req.headers && req.headers.cookie.split(';').forEach(function(cookie) {
            var parts = cookie.match(/(.*?)=(.*)$/)
            cookies[ parts[1].trim() ] = (parts[2] || '').trim();
        });
        axios.defaults.cookies = cookies;
        return cookies;
    } catch (error) {
        
    }
}