<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
	function IM(){
		var connection = this.connection = function(){
			this.aa = "aa";
			this.bb = "bb";
			this.cc = "cc";
		}
		
		var val = 1;
		
		
		
		this.handle1 = function(){
			alert(val);
			
			var listens = {
					vv:function(){
						alert(val+1);
					}
			}
			listens.vv();
		}

		
		
	}
	
	IM.prototype.demo = function(){
		alert("demo"+val);
	}
	var im = new  IM();
	im.handle1();
	
</script>
</head>
<body>
	<form action="/web_im/UserSerrvlet">
	<div>
		<input name="un" type="text" value="hzong" /><br/>
		<input name="pwd" type="text" value = "123"/>
		<input type="submit" value = "登录" />	
	</div>
	</form>
</body>
</html>