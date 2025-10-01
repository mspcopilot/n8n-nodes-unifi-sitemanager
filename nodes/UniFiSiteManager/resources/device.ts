import type { INodeProperties } from 'n8n-workflow';
import { createPaginationProperties, createPaginationConfiguration, dataOutputProperty } from '../shared/commonproperties';

const deviceGetAllDescription: INodeProperties[] = [
	...createPaginationProperties('device'),
	{
		displayName: 'Host IDs',
		name: 'hostIDs',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['getAll'],
			},
		},
		default: [],
		description: 'Filter devices by specific host IDs',
		typeOptions: {
			loadOptions: {
				routing: {
					request: {
						method: 'GET',
						url: '/v1/hosts',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
							{
								type: 'setKeyValue',
								properties: {
									name: '={{$responseItem.reportedState?.name || $responseItem.id || "Unnamed Host"}}',
									value: '={{$responseItem.id}}',
								},
							},
						],
					},
				},
			},
		},
	},
	{
		displayName: 'Last Processed Time',
		name: 'time',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['device'],
				operation: ['getAll'],
			},
		},
		default: '',
		description: 'Last processed timestamp of devices',
	},
];

const showOnlyForDevices = {
	resource: ['device'],
};

export const deviceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForDevices,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many devices',
				description: 'Retrieve a list of UniFi devices managed by hosts where the UI account is owner or super admin',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/devices',
						qs: {
							pageSize: '={{ !$parameter.returnAll ? $parameter.limit : undefined }}',
							time: '={{ $parameter.time ? ($parameter.time.endsWith("Z") ? $parameter.time : $parameter.time + "Z") : undefined }}',
							hostIDs: '={{ $parameter.hostIDs && $parameter.hostIDs.length > 0 ? "[" + $parameter.hostIDs.join(", ") + "]" : undefined }}',
						},
					},
					operations: createPaginationConfiguration('/v1/devices'),
					output: dataOutputProperty,
				},
			},
		],
		default: 'getAll',
	},
	...deviceGetAllDescription,
];