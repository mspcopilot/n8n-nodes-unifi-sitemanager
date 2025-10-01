# n8n-nodes-unifi-sitemanager

This is an n8n community node. It lets you use UniFi Site Manager in your n8n workflows.

I built it to test out declarative n8n nodes, but wanted to share it. Shoutout to [r/msp](https://www.reddit.com/r/msp/). You can reach me at [u/j0dan](https://www.reddit.com/user/j0dan/) there.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Hosts
- **Get Many** - Retrieve a list of many hosts associated with your UI account
- **Get** - Get detailed information about a specific host by ID

### Sites
- **Get Many** - Retrieve a list of many sites from hosts running the UniFi Network application

### Devices  
- **Get Many** - Retrieve a list of UniFi devices managed by hosts where your UI account is owner or super admin
  - Filter by specific host IDs
  - Filter by last processed timestamp

### ISP Metrics
- **Get** - This endpoint is in **early access**, but I've included it here so you can try it out without reading the UniFi documentation. It might break in the future or have limited usability, etc.

## Credentials

This node uses API key authentication to connect to the UniFi Site Manager API.

For detailed instructions, see the [UniFi Site Manager API Getting Started Guide](https://developer.ui.com/site-manager-api/gettingstarted#obtaining-an-api-key).

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [UniFi Site Manager API Documentation](https://developer.ui.com/site-manager-api/gettingstarted)
* [UniFi Developer Console](https://developer.ui.com/)