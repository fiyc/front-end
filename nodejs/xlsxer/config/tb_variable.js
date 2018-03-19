var param = {
	content:'',
	data_points_id:'',
	data_points_name:'',
	endBit:'',
	data_points_id:'',
	data_points_name:'',
	variable_group_id:'',
	variable_group_name:'',
	variable_group_id:'',
	variable_group_name:''
}


module.exports = {
		getsql:function(para){
			Object.assign(param, para);
			return `INSERT INTO tb_variable (
				alias_name,
				data_points_id,
				data_points_name,
				data_type,
				delete_flag,
				description,
				config,
				var_name,
				var_type,
				var_value,
				variable_group_id,
				variable_group_name,
				writable
			  ) VALUES 
			  (
				'${param.content}', -- alias_name
				${param.data_points_id}, -- 
				'${param.data_points_name}', -- data_points_name
				'int',
				0,
				'${param.content}', -- description
				-- script
				'{\"aliasName\":\"${param.content}\",\"dataUnits\":[{\"unitAlias\":\"单元0\",\"startBit\":${param.startBit},\"endBit\":${param.endBit},\"byteOrder\":\"BIG_ENDIAN\"}],\"description\":\"\",\"varName\":\"\",\"dataType\":\"int\",\"dataPointsId\":${param.data_points_id},\"dataPointsName\":\"${param.data_points_name}\",\"variableGroupId\":${param.variable_group_id},\"variableGroupName\":\"${param.variable_group_name}\",\"calculation\":{\"operation\":\"=\",\"formula\":\"\"}}',
				'',
				'dataPoint',
				NULL,
				${param.variable_group_id},
				'${param.variable_group_name}',
				NULL
			  );`;
		}
}
