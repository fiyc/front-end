$(function(){
    $("button").bind("click", function(){
        var jsStr = $(this).find("pre").text();
        eval(jsStr);
    });

    MakeTable("xuanzeqi", xuanzeqi);
    MakeTable("domaction",domaction);
});

function MakeTable(id, data){
    var thead = $("#"+id + " thead tr");
    var tbody = $("#"+id + " tbody");
    var headerData = data.header;
    var width=thead.css("width").split("px")[0];
    width = width/headerData.length;

    var indexColumn = "<td style='width:60px'>序号</td>";
    thead.append(indexColumn);
    for(var i=0; i<headerData.length; i++){
        if(i == 0){
            var tdHtml = "<td style='width:"+ (width - 60) +"px'>" + headerData[i] + "</td>";
            thead.append(tdHtml);
        }else{
            var tdHtml = "<td style='width:"+ width +"px'>" + headerData[i] + "</td>";
            thead.append(tdHtml);
        }
    }

    var bodyData = data.body;
    for(var i=0; i<bodyData.length; i++){
        var item = bodyData[i];

        var trHtml = "<tr><td>" + (i + 1) + "</td>";
        for(var j=0; j<item.length; j++){
            trHtml += "<td>" + item[j] + "</td>";
        }

        trHtml += "</tr>";
        tbody.append(trHtml);
    }
}


var xuanzeqi={
    "header" : ["选择器", "描述", "返回", "示例"],
    "body":[
        [
            "#id",
            "根据给定的id匹配一个元素",
            "单个元素",
            '$("#test")选取id为test的元素'
        ],
        [
            "#class",
            "根据给定的类名匹配元素",
            "集合元素",
            '$(".test")选取class为test的元素'
        ],
        [
            "element",
            "根据给定的元素名匹配元素",
            "集合元素",
            '$("p")选取所有的p元素'
        ],
        [
            "*",
            "匹配所有元素",
            "集合元素",
            '$("*")选取所有的元素'
        ],
        [
            "selector1, selector2, ..., selectorN",
            "将每一个选择器匹配到的元素合并后一起返回",
            "集合元素",
            '$("div,span,p.myClass")选取所有div, span和拥有class为myClass的p标签'
        ],
        [
            "$(ancestor descendant)",
            "选取ancestor元素里的所有descendant(后代)元素",
            "集合元素",
            '$("div span")选取div里所有的span元素'
        ],
        [
            "$(parent > child)",
            "选取parent元素下的child(子)元素",
            "集合元素",
            '$("div > span")选取div元素下元素名是span的子元素'
        ],
        [
            "$(prev + next)",
            "选取紧接在prev元素后的next元素",
            "集合元素",
            '$(".one + div")选取class为one的下一个div同辈元素'
        ],
        [
            "$(prev).next(next)",
            "选取紧接在prev元素后的next元素, 可替代$(prev + next)",
            "集合元素",
            '$(".one").next("div")选取class为one的下一个div同辈元素'
        ],
        [
            "$(prev ~ siblings)",
            "选取prev元素之后的所有siblings",
            "集合元素",
            '$("#two ~ div")选取id为two的元素后面所有div同辈元素'
        ],
        [
            "$(prev).nextAll(siblings)",
            "选取prev元素之后的所有siblings,可替代$(prev ~ siblings)",
            "集合元素",
            '$("#two").nextAll("div")选取id为two的元素后面所有div同辈元素'
        ],
        [
            "$(prev).siblings(siblings)",
            "选取prev元素的所有同辈siblings",
            "集合元素",
            '$("#two").siblings("div")选取id为two的所有同辈div元素'
        ],
        [
            ":first",
            "选取第一个元素",
            "单个元素",
            '$("div:first") 选取所有div元素中第一个div元素'
        ],
        [
            ":last",
            "选取最后一个元素",
            "单个元素",
            '$("div:last") 选取所有div元素中最后一个div元素'
        ],
        [
            ":not(selector)",
            "去除所有与给定选择器匹配的元素",
            "集合元素",
            '$("input:not(.myClass)") 选取class不是myClass的input元素'
        ],
        [
            ":even",
            "选取索引是偶数的所有元素,索引从0开始",
            "集合元素",
            '$("input:even") 选取索引是偶数的input元素'
        ],
        [
            ":odd",
            "选取索引是奇数的所有元素,索引从0开始",
            "集合元素",
            '$("input:odd") 选取索引是奇数的input元素'
        ],
        [
            "eq(index)",
            "选取索引等于index的元素(index从0开始)",
            "单个元素",
            '$("input:eq(1)")选取索引值等于1的input元素'
        ],
        [
            ":gt(index)",
            "选取索引大于index的元素(index从0开始)",
            "单个元素",
            '$("input:gt(1)")选取索引值大于1的input元素'
        ],
        [
            ":lt(index)",
            "选取索引小于index的元素(index从0开始)",
            "单个元素",
            '$("input:lt(1)")选取索引值小于1的input元素'
        ],
        [
            ":header",
            "选取所有的标题元素,例如h1, h2, h3等等",
            "集合元素",
            '$(":header")选取网页中所有的h1, h2, h3...'
        ],
        [
            ":animated",
            "选取当前正在执行动画的所有元素",
            "集合元素",
            '$("div:animated") 选取正在执行动画的div元素'
        ],
        [
            ":focus",
            "选取当前获取焦点的元素",
            "集合元素",
            '$(":focus") 选取当前获取焦点的元素'
        ],
        [
            ":contains(text)",
            "选取含有文本内容为text的元素",
            "集合元素",
            '$("div:contains("我")") 选取含有文本 "我" 的div元素 '
        ],
        [
            ":empty",
            "选取不包含子元素或者本文的空元素",
            "集合元素",
            '#("div:empty") 选取不包含子元素的div元素'
        ],
        [
            ":has(selector)",
            "选取含有选择器所有配的元素的元素",
            "集合元素",
            '$("div:has(p)") 选取含有p元素的div元素'
        ],
        [
            ":parent",
            "选取含有子元素或者文本的内容",
            "集合元素",
            '$("div:parent") 选取拥有子元素的div元素'
        ],
        [
            ":hidden",
            "选取所有不可见的元素",
            "集合元素",
            '$(":hidden") 选取所有不可见的元素, 包括&lt;input type="hidden" /&gt;, &lt;div style="display:none"&gt;, &lt;div style="visibility:hidden"&gt;等, 如果只是选取input元素, 可以使用$("input:hidden")'
        ],
        [
            ":visible",
            "选取所有可见的元素",
            "集合元素",
            '$("div:visible") 选取所有可见的div元素'
        ],
        [
            "[attribute]",
            "选取拥有此属性的元素",
            "集合元素",
            '$("div[id]") 选取拥有属性id的元素'
        ],
        [
            "[attribute!=value]",
            "选取属性的值为value的元素",
            "集合元素",
            '$("div[title=test]") 选取属性title为test的div元素'
        ],
        [
            "[attribute!=value]",
            "选取属性的值不为value的元素",
            "集合元素",
            '$("div[title!=test]") 选取属性title不为test的div元素'
        ],
        [
            "[attribute^=value]",
            "选取属性的值以value开始的元素",
            "集合元素",
            '$("div[title^=test]")选取属性title以test开始的div元素'
        ],
        [
            "[attribute$=value]",
            "选取属性的值以value结束的元素",
            "集合元素",
            '$("div[title$=test]") 选取属性title以test结束的div元素'
        ],
        [
            "[attribute*=test]",
            "选取属性的值中含有value的元素",
            "集合元素",
            '$("div[title*=test]") 选取属性title含有test的div元素'
        ],
        [
            "[attribute|=value]",
            "选取属性等于给定字符串或以该字符串为前缀(该字符串后跟一个连字符-)的元素",
            "集合元素",
            '$(div[title|="en"]) 选取属性title等于en或以en为前缀的元素'
        ],
        [
            "[attribute~=value]",
            "选取属性用空格分隔的值中包含一个给定值得元素",
            "集合元素",
            '$("div[title~="uk"]") 选取属性title用空格分隔的值中包含字符uk的元素'
        ],
        [
            "[attribute1][attribute2][attributeN]",
            "用属性选择器合成拼成一个复合属性选择器，满足多个条件，没选择一次，缩小一次范围",
            "集合元素",
            '$("div[id][title$="test"]") 选择拥有属性id，并且属性title以test结束的div元素'
        ],
        [
            ":nth-child(index/even/odd/equation)",
            "选取每个父元素下的第index个子元素或者奇偶元素(index从1开始)",
            "集合元素",
            ':eq(index)只匹配一个元素, 而:nth-child将为每一个父元素匹配子元素'
        ],
        [
            ":first-child",
            "选取每个父元素的第一个子元素",
            "集合元素",
            ':first只返回单个元素, 而:first-child选择符将为每个父元素匹配第1个子元素。例如：$("ul li:first-child") 选取每个ul中第一个li元素'
        ],
        [
            ":last-child",
            "同上",
            "同上",
            '同上'
        ],
        [
            ":only-child",
            "如果某个元素是它父元素中唯一的子元素，那么将会被匹配。如果父元素中含有其他元素，则不会被匹配。",
            "集合元素",
            '$("ul li:only-child") 在ul中选取是唯一子元素的li元素'
        ],
        [
            ":enabled",
            "选取所有可用元素",
            "集合元素",
            '$("#form1:enabled") 选取id为form1的表单内的所有可用元素'
        ],
        [
            ":disabled",
            "选取所有不可用元素",
            "集合元素",
            '$("#form1:disabled") 选取id为form1的表单内的所有不可用元素'
        ],
        [
            ":checked",
            "选取所有被选中的元素(单选框，复选框)",
            "集合元素",
            '$("input:checked") 选取所有被选中的input元素'
        ],
        [
            ":selected",
            "选取所有被选中的选项元素(下拉列表)",
            "集合元素",
            '$("select option:selected") 选取所有被选中的选项元素'
        ],
        
    ]
}


var domaction={
    "header" : ["方法", "描述", "示例"],
    "body" : [
        [
            "append()",
            "向每个匹配的元素内部追加内容",
            'HTML代码: <br> &lt;p&gt;我想说: &lt;/p&gt <br>jQuery代码: <br>$("p").append("&lt;b&gt;你好&lt;/b&gt;") <br>结果:<br>&lt;p&gt;我想说: &lt;b&gt;你好&lt;/b&gt;&lt;/p&gt;'
        ],
        [
            "appendTo()",
            "将所有匹配的元素追加到指定的元素中，实际上，使用该方法是点到了常规的$(A).append(B)的操作，继不是将B追加到A中，而是将A追加到B中",
            'HTML代码：<br>&lt;p&gt;我想说: &lt;/p&gt;<br>jQuery代码:<br>$("&lt;b&gt;你好&lt;/b&gt;").appendTo("p");<br>结果:<br>&lt;p&gt;我想说: &lt;b&gt;你好&lt;/b&gt;&lt;/p&gt;'
        ],
        [
            "prepend()",
            "向每个匹配的元素内部前置内容",
            'HTML代码：<br>&lt;p&gt;我想说: &lt;/p&gt;<br>jQuery代码:<br>$("p").prepend("&lt;b&gt;你好&lt;/b&gt;");<br>结果:<br>&lt;p&gt;&lt;b&gt;你好&lt;/b&gt;我想说:&lt;/p&gt;'
        ],
        [
            "prependTo()",
            "将所有匹配的元素前置到指定的元素中",
            'HTML代码：<br>&lt;p&gt;我想说: &lt;/p&gt;<br>jQuery代码:<br>$("&lt;b&gt;你好&lt;/b&gt;").prependTo("p");<br>结果:<br>&lt;p&gt;&lt;b&gt;你好&lt;/b&gt;我想说:&lt;/p&gt;'
        ],
        [
            "after()",
            "在每个元素的元素后面插入内容",
            'HTML代码：<br>&lt;p&gt;我想说: &lt;/p&gt;<br>jQuery代码:<br>$("p").after("&lt;b&gt;你好&lt;/b&gt;");<br>结果:<br>&lt;p&gt;我想说:&lt;/p&gt;&lt;b&gt;你好&lt;/b&gt;'
        ],
        [
            "insertAfter()",
            "将所有匹配的元素插入到指定元素的后面",
            'HTML代码：<br>&lt;p&gt;我想说: &lt;/p&gt;<br>jQuery代码:<br>$("&lt;b&gt;你好&lt;/b&gt;").insertAfter("p");<br>结果:<br>&lt;p&gt;我想说:&lt;/p&gt;&lt;b&gt;你好&lt;/b&gt;'
        ],
        [
            "before()",
            "在每个匹配的元素之前插入内容",
            'HTML代码：<br>&lt;p&gt;我想说: &lt;/p&gt;<br>jQuery代码:<br>$("p").before("&lt;b&gt;你好&lt;/b&gt;");<br>结果:<br>&lt;b&gt;你好&lt;/b&gt;&lt;p&gt;我想说:&lt;/p&gt;'
        ],
        [
            "insertBefore()",
            "将所有匹配的元素插入到指定的元素的前面",
            'HTML代码：<br>&lt;p&gt;我想说: &lt;/p&gt;<br>jQuery代码:<br>$("&lt;b&gt;你好&lt;/b&gt;").insertBefore("p");<br>结果:<br>&lt;b&gt;你好&lt;/b&gt;&lt;p&gt;我想说:&lt;/p&gt;'
        ],
        [
            "remove()",
            "删除所有匹配的元素，传入的参数用于根据jQuery表达式来筛选元素, 返回被删除节点的引用",
            '$("ul li:eq(1)").remove() 获取第二个li元素，将它删除'
        ],
        [
            "detach()",
            "同remove()删除元素，但是会保留jQuery对象，绑定的事件，附加的数据会保留",
            '$("ul li:eq(1)").detach() 获取第二个li元素，将它删除.'
        ],
        [
            "empty()",
            "清空节点",
            '$("ul li:eq(1)").empty() 获取第二个li元素，将它的内容清空'
        ],
        [
            "clone()",
            "复制节点",
            '$(this).clone().appendTo("body"); 不具有任何行为 <br>$(this).clone(true).appendTo("body"); 复制了行为'
        ],
        [
            "replaceWith()",
            "将所有匹配的元素都替换成指定的HTML或者DOM元素",
            '$("p").replaceWith(&lt;strong&gt;你最不喜欢的水果&lt;/strong&gt;)'
        ],
        [
            "replaceAll()",
            "用指定的HTML或者DOM元素替换所有匹配的元素",
            '$(&lt;strong&gt;你最不喜欢的水果&lt;/strong&gt;).replaceAll("p")'
        ],
        [
            "wrap()",
            "将某个节点用其他标记包裹起来",
            '$("strong").wrap(&lt;b&gt;&lt;/b&gt;); <br>结果为<br>&lt;b&gt;&lt;strong&gt;你最喜欢的水果&lt;/strong&gt;&lt;/b&gt;'
        ],
        [
            "wrapAll",
            "将所有匹配的元素用一个元素包裹",
            '$("strong").wrapAll(&lt;b&gt;&lt;/b&gt;);<br>结果为<br>&lt;b&gt;&lt;strong&gt;你最喜欢的水果&lt;/strong&gt;&lt;strong&gt;你最喜欢的水果&lt;/strong&gt;&lt;strong&gt;你最喜欢的水果&lt;/strong&gt;&lt;/b&gt;<br>注意：如果被包裹的多个元素间有其他元素，其他元素会被放到包裹元素之后'
        ],
        [
            "wrapInner",
            "将所有匹配的元素的子内容用其他标记包裹",
            '$("strong").wrapInner(&lt;b&gt;&lt;/b&gt;);<br>结果为<br>&lt;strong&gt;&lt;b&gt;你最喜欢的水果&lt;/b&gt;&lt;/strong&gt;'
        ],
    ]
}

