@extends('emailtemplates.main')

@section('content')
    <p>Dear {{$first_name}} {{$last_name}},</p>

    <p>You have successfully registered as one of our Rebrand Apps members.</p>

    <p>Please keep this information safe as it contains your username and password.</p>

    <p>Your Membership Info:<br />
    U: {{$email}} <br />
    P: <em>{{ $password }}</em></p>

    <p>Login URL: <a href='{{ $login_url }}'>{{ $login_url }}</a></p>

    <p>Make sure you "Like" our Facebook Fan Page for additional news and updates!</p>

    <p><a href="//www.facebook.com/DigitalKickstart">http://www.facebook.com/DigitalKickstart</a></p>

    <p>If you have any support concerns at all you can create a support ticket be going to:</p>

    <p><a href='//support.digitalkickstart.com'>http://support.digitalkickstart.com</a></p>

    <p>To Your Online Success!<br />
    Mark Thompson</p>
@endsection