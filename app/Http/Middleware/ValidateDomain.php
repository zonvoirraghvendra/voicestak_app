<?php

namespace App\Http\Middleware;
use Closure;
use Session;
use App\Repositories\WhiteLabelRepository;
use App\Models\WhiteLabels;

class ValidateDomain
{
    public function handle($request, Closure $next) {
        
        $domain = $_SERVER['HTTP_HOST'];
        $default = parse_url(env('APP_HOST'));
        
        if ($default['host'] == $domain) {
        	view()->share('white_label_options', [
        	    'company_logo'             => '//app.voicestak.com/assets/img/voiceStackLogo.png',
                    'background_color'       => '#E1E9EF',
                    'top_bar_color' => '#101010',
                    'header_bar_color' => '#2c3e50', 
                    'button_color' => '#5cb85c'

        	]);
            return $next($request);
        } else {
            
        	$white_label_options = WhiteLabels::where('cname_url', $domain)->first();
        	if (!is_object($white_label_options)) {
        		return app()->abort(403, "Access Denied");
        	}
                
                $white_label_options = [
        	'company_logo'             => (empty($white_label_options->company_logo)) ? '//app.voicestak.com/assets/img/voiceStackLogo.png' : $white_label_options->company_logo,
        	'background_color'            => (empty($white_label_options->background_color)) ? '#E1E9EF' : $white_label_options->background_color,
                'top_bar_color'           => (empty($white_label_options->top_bar_color)) ? '#101010' : $white_label_options->top_bar_color,
                'header_bar_color'            => (empty($white_label_options->header_bar_color)) ? 'header_bar_color' : $white_label_options->header_bar_color,
                'button_color'       => (empty($white_label_options->button_color)) ? '#5cb85c' : $white_label_options->button_color
        	];
                
                Session::put('white_label_options', $white_label_options);

                return $next($request);
            
        }
    }
}