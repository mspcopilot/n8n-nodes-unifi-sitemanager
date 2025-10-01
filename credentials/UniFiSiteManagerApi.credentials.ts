import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UniFiSiteManagerApi implements ICredentialType {
	name = 'uniFiSiteManagerApi';

	displayName = 'UniFi Site Manager API';

	icon: Icon = 'file:../icons/unifi.svg';

	documentationUrl = 'https://developer.ui.com/site-manager-api/gettingstarted#obtaining-an-api-key';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			hint: 'You can get your API key from the UniFi Developer Console',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-KEY': '={{$credentials?.apiKey}}',
				'Accept': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.ui.com',
			url: '/v1/hosts',
			method: 'GET',
		},
	};
}
