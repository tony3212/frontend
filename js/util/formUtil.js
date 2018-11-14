/**
 * depends: jQuery
 * @type {{submitByForm: formUtil.submitByForm}}
 */
var formUtil = formUtil || {
    /**
     * 根据要提交的数据对象生成一个form表单，并提交表单，提交完成后删除该表单
     * @param formObject 要提交的对象
     * @param formAttribute 表单配制， {id: ..., method: "", target}
     */
    submitByForm: function (formObject, formAttribute) {
        var $form, form, inputTemplate;

        inputTemplate = '<input type="hidden" name="{1}" value="{2}" />';

        // 1.生成表单内容
        $form = $("<form action=''></form>");
        $.each(formObject, function (fieldName, fieldValue) {
            if ($.isArray(fieldValue)) {
                $.each(fieldValue, function (index, value) {
                    $form.append(inputTemplate.replace("{1}", fieldName + "[]").replace("{2}", value));
                });
            } else {
                fieldValue != null && $form.append(inputTemplate.replace("{1}", fieldName).replace("{2}", fieldValue));
            }
        });

        // 2.生成表单相关属性
        form = $form[0];
        $.each(formAttribute, function (attrName, attrValue) {
            form[attrName] = attrValue
        });

        $form.appendTo("body").submit().remove();
    }
};