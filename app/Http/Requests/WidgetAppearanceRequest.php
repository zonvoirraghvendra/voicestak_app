<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class WidgetAppearanceRequest extends Request {

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
			'lightbox' => 'required_with:custom_button_code'
		];
	}

	/**
	 * Merge campaign_id to $request->all().
	 *
	 * @return array
	 */
	public function inputs($campaign_id) {
		return array_merge(['campaign_id' => $campaign_id], $this->all());
	}

}