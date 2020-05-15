@extends('emailtemplates.main')

@section('content')
    <p>Hey {{ $rebrander_name }},</p>

    <p>Great job...You just made a new sale!</p>

    <p>Customer: {{ $first_name }} {{ $last_name }}<br />
    Customer email: {{ $email }}<br />
    Product: {{ $product_name }}<br />
    Package: ${{ $package->product_price }} {{ $package->period }}</p>

    <p>If you have any questions or comments, please contact our support desk at <a href="//support.digitalkickstart.com">http://support.digitalkickstart.com</a></p>

    <p>Cheers,<br />
    Rebrand Apps Team</p>
@endsection