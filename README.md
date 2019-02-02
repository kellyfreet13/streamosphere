# Streamosphere
## Server setup
Follow Server setup if for brand new instances<br/>
The instance by default does not allow any traffic through the default ports (80, 8080, 443, 8443).<br/>
To allow traffic run commands below to add input policies.
```
sudo iptables -I INPUT 1 -p tcp --dport 443 -j ACCEPT
sudo iptables -I INPUT 1 -p tcp --dport 8443 -j ACCEPT
sudo iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 1 -p tcp --dport 8080 -j ACCEPT
```
After you add the ports `sudo iptables -L -n` should list those 4 ports on the Chain Input(policy ACCEPT)<br/>
And pipe forward traffic from port 80 -> 8080 so `:8080` does not have to be specified in `streamosphere.net`<br/>
` sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --t`<br/>
We pipe forward the traffic since giving the web server access requires `sudo` permissions which is a security risk<br/>
To save the config for iptables
```
sudo iptables-save > iptables.dump 
cat iptables.dump 
```
