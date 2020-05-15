<?php

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
*/

$app = new Illuminate\Foundation\Application(
	realpath(__DIR__.'/../')
);

/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
|
| Next, we need to bind some important interfaces into the container so
| we will be able to resolve them when needed. The kernels serve the
| incoming requests to this application from both the web and CLI.
|
*/

$app->singleton(
	'Illuminate\Contracts\Http\Kernel',
	'App\Http\Kernel'
);

$app->singleton(
	'Illuminate\Contracts\Console\Kernel',
	'App\Console\Kernel'
);

$app->singleton(
	'Illuminate\Contracts\Debug\ExceptionHandler',
	'App\Exceptions\Handler'
);

$app->singleton(
	'App\Contracts\CampaignServiceInterface',
	'App\Services\CampaignService'
);

$app->singleton(
	'App\Contracts\WidgetServiceInterface',
	'App\Services\WidgetService'
);

$app->singleton(
	'App\Contracts\MessageServiceInterface',
	'App\Services\MessageService'
);

$app->singleton(
	'App\Contracts\EmailServicesServiceInterface',
	'App\Services\EmailServicesService'
);

$app->singleton(
	'App\Contracts\SmsServicesServiceInterface',
	'App\Services\SmsServicesService'
);

$app->singleton(
	'App\Contracts\YoutubeServiceInterface',
	'App\Services\YoutubeService'
);

$app->singleton(
	'App\Contracts\WidgetStatServiceInterface',
	'App\Services\WidgetStatService'
);
$app->singleton(
	'App\Contracts\WidgetClicksServiceInterface',
	'App\Services\WidgetClicksService'
);
$app->singleton(
	'App\Contracts\WidgetFeedbackServiceInterface',
	'App\Services\WidgetFeedbackService'
);
$app->singleton(
	'App\Contracts\WidgetOptinServiceInterface',
	'App\Services\WidgetOptinService'
);

$app->singleton(
	'App\Contracts\PersonalMessageServiceInterface',
	'App\Services\PersonalMessageService'
);

$app->singleton(
	'App\Contracts\AdminServiceInterface',
	'App\Services\AdminService'
);
/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/

return $app;
