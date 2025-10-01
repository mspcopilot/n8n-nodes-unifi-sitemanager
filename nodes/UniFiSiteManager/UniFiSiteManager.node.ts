import { NodeConnectionType, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { hostDescription } from './resources/host';
import { siteDescription } from './resources/site';
import { deviceDescription } from './resources/device';
import { ispMetricsDescription } from './resources/isp-metrics';

export class UniFiSiteManager implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'UniFi Site Manager',
		name: 'uniFiSiteManager',
		icon: 'file:../../icons/unifi.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Manage UniFi devices and networks through the Site Manager API',
		defaults: {
			name: 'UniFi Site Manager',
		},
		usableAsTool: true,
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'uniFiSiteManagerApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.ui.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Host',
						value: 'host',
					},
					{
						name: 'Site',
						value: 'site',
					},
					{
						name: 'Device',
						value: 'device',
					},
					{
						name: 'ISP Metrics (Early Access)',
						value: 'ispMetrics',
					},
				],
				default: 'host',
			},
			...hostDescription,
			...siteDescription,
			...deviceDescription,
			...ispMetricsDescription,
		],
	};
}
