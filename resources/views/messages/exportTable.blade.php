<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
	</head>
	<body>
		<style>
			tbody tr td {
				font-size:10px;
				font-weight: normal;
			}
			.header td{
				background-color: #ececec;
				border:1px solid black;
			}
		</style>
		<table>
			<thead>
				<tr class="header">
					<td>Campaign</td>
					<td>Widget</td>
					<td>Name</td>
					<td>Phone</td>
					<td>Youtube URL</td>
				</tr>
			</thead>
			<tbody>
				@foreach( $messages as $message )
					<tr>
						<td style="">{!! $message['campaign_id'] !!}</td>
						<td>{!! $message['widget_id'] !!}</td>
						<td>{!! $message['name'] !!}</td>
						<td>{!! $message['phone'] !!}</td>
						@if( $message['youtube_url'] )
							<td><a href="http:{!! $message['youtube_url'] !!}">http:{!! $message['youtube_url'] !!}</a></td>
						@endif
					</tr>
				@endforeach
			</tbody>
		</table>
	</body>
</html>