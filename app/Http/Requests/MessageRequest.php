<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class MessageRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [

		];
	}

	/**
	 * Merge campaign_id and widget_id to $request->all().
	 *
	 * @return array
	 */
	public function inputs($campaign_id, $widget_id, $user_id , $name = null , $email = null ) {
		if( $this->has('email') ){
			if( !$this->has('name') && $name !== null ){
				return array_merge(['name' => $name ,'campaign_id' => $campaign_id, 'widget_id' => $widget_id, 'user_id' => $user_id], $this->all());		
			}else{
				return array_merge(['campaign_id' => $campaign_id, 'widget_id' => $widget_id, 'user_id' => $user_id], $this->all());
			}
		}else{
			return array_merge([ 'name' => $name , 'email' => $email ,  'campaign_id' => $campaign_id, 'widget_id' => $widget_id, 'user_id' => $user_id], $this->all() );
		}
	}

}