@foreach($messagesList as $key => $message)
	@include('messages.parts.item')
@endforeach
