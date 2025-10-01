import type { INodeProperties } from 'n8n-workflow';
import { dataOutputProperty } from '../shared/commonproperties';

const ispMetricsGetDescription: INodeProperties[] = [
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['ispMetrics'],
				operation: ['get'],
			},
		},
		options: [
			{
				name: '5 Minutes',
				value: '5m',
				description: 'Get metrics in 5-minute intervals (24h duration)',
			},
			{
				name: '1 Hour',
				value: '1h',
				description: 'Get metrics in 1-hour intervals (7d or 30d duration)',
			},
		],
		default: '1h',
		required: true,
		description: 'The time interval for metrics collection',
	},
	{
		displayName: 'Duration',
		name: 'duration',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['ispMetrics'],
				operation: ['get'],
				type: ['5m'],
			},
		},
		options: [
			{
				name: '',
				value: '',
			},
			{
				name: '24 Hours',
				value: '24h',
			},
		],
		default: '24h',
		description: 'Duration for 5-minute interval metrics',
	},
	{
		displayName: 'Duration',
		name: 'duration',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['ispMetrics'],
				operation: ['get'],
				type: ['1h'],
			},
		},
		options: [
			{
				name: '',
				value: '',
			},
			{
				name: '7 Days',
				value: '7d',
			},
			{
				name: '30 Days',
				value: '30d',
			},
		],
		default: '7d',
		description: 'Duration for 1-hour interval metrics',
	},
	{
		displayName: 'Begin Timestamp',
		name: 'beginTimestamp',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['ispMetrics'],
				operation: ['get'],
			},
			hide: {
				duration: ['24h', '7d', '30d'],
			},
		},
		default: '',
		description: 'Start time for custom time range (RFC3339 format). Only used when duration is not specified.',
	},
	{
		displayName: 'End Timestamp',
		name: 'endTimestamp',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['ispMetrics'],
				operation: ['get'],
			},
			hide: {
				duration: ['24h', '7d', '30d'],
			},
		},
		default: '',
		description: 'End time for custom time range (RFC3339 format). Only used when duration is not specified.',
	},
];

const showOnlyForIspMetrics = {
	resource: ['ispMetrics'],
};

export const ispMetricsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForIspMetrics,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get ISP metrics',
				description: 'Retrieve ISP metrics for all sites linked to your UI account',
				routing: {
					request: {
						method: 'GET',
						url: '=/ea/isp-metrics/{{$parameter.type}}',
						qs: {
							duration: '={{ $parameter.duration || undefined }}',
							beginTimestamp: '={{ $parameter.beginTimestamp ? ($parameter.beginTimestamp.endsWith("Z") ? $parameter.beginTimestamp : $parameter.beginTimestamp + "Z") : undefined }}',
							endTimestamp: '={{ $parameter.endTimestamp ? ($parameter.endTimestamp.endsWith("Z") ? $parameter.endTimestamp : $parameter.endTimestamp + "Z") : undefined }}',
						},
					},
					output: dataOutputProperty,
				},
			},
		],
		default: 'get',
	},
	...ispMetricsGetDescription,
];