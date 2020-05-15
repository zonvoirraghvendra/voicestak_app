@extends('emailtemplates.main')

@section('content')
    <p>Congratulations on your purchase.</p>

    <p>NOTE: This is just your receipt. Your login credentials have already been sent to you in a previous email.</p>

    <p>PURCHASE DETAILS:</p>

    <p>Product: Rebrand Apps - {{ $product_name }}<br/>
        Price: ${{ $package->product_price }} / {{ $package->period }}<br/>
        Transaction ID: {{ $transaction_id }}</p>

    <p>Need Product Support?</p>

    <p>* If you have any issues or concerns, please create a support ticket at our help desk.</p>

    <p>Please visit:<br/>
        <a href="//support.digitalkickstart.com">http://support.digitalkickstart.com</a></p>
@endsection