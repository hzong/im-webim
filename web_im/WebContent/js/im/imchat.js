/**
 * 渲染XMPP
 */
var imSDK = null;


function init(){
	imSDK.getGroupList(function(obj,i){
		$("#grouplist").html("");
		$("#grouplist").append("<span groupid = '"+obj.groupId+"' ><a href='#'>"+obj.name+"</a>&nbsp;&nbsp;<span style='cursor: pointer;'>删除</span></span><br/>");
		var span = $("#grouplist span[jid="+obj.groupId+"] a");
		span.find("a").click(function(){
			$("#to").val(obj.groupId);
		});
		
	});
	imSDK.getRostersList(function(obj,i){
		$("#rosterlist").append("<span jid = '"+obj.id+"'><a href='#'>"+obj.remark+"</a>&nbsp;&nbsp;<span style='cursor: pointer;'>删除</span></span><br/>");
		var span =  $("#rosterlist span[jid="+obj.id+"]");
		span.find("a").click(function(){
			$("#to").val(obj.id);
			$("#sqhy_text").val(obj.id);
		});
		span.find("span").click(function(){
			var jid = $(this).parent().attr("jid");
			imSDK.removeRoster(jid);
		});
	});
	
//	imSDK.removeRosters(imAccount, cbSuccess, cbError)
	
	$("#sqhy").unbind('click');//解除绑定
	$("#sqhy").click(function(){
		var imAccount = $("#sqhy_text").val();
		var val=prompt("请输入理由：","");//将输入的内容赋给变量 name ，
//        //这里需要注意的是，prompt有两个参数，前面是提示的话，后面是当对话框出来后，在对话框里的默认值
        if(val)//如果返回的有内容
        {
        	imSDK.applyRoster(imAccount,"测试");
        }
//		alert("申请好友成功");
	});
	
	
	$("#send").unbind('click');//解除绑定
	$("#send").click(function(){//发送消息
		var msgb = new imSDK.MsgTextBuilder({"content":$("#content").val()});
		var sesstionType = $('input[name="sessionType"]:checked').val();
		
		var cbError = function(){
			
		};
		
		
		if(sesstionType == 0)
			imSDK.sendMsg(imSDK.sessionType.chat,$("#to").val(),msgb,cbError);
		else
			imSDK.sendMsg(imSDK.sessionType.groupchat,$("#to").val(),msgb,cbError);
	});
	
	
}

function IMConnection(){
	imSDK = new IMClient(true);
	
	//聊天监听必须使用
	imSDK.ChatMessageListen = function(sessionType,msg){
		var ele = "";
		ele = "<br/><div>"+msg.sendtime+(sessionType == 'chat' ? "  ":"  房间为："+msg.room)+"-"+msg.from+"对你说话<br/> <div>内容："+$.evalJSON(msg.body).content+"</div><br/></div>";
		$("#msg_chat").prepend(ele);
	};
	
	imSDK.RosterListen = {
			onApplyRoster:function(username,reason){//申请好友
				if(confirm("来自"+username+"用户-请求加你为好友："+reason))
			    {
					imSDK.agreeRoster(username,username+(Math.random()*6 + 1),"好友列表");
					imSDK.A
			    }
			    else
			    {//否则说明下了
			    	var val=prompt("请输入拒绝理由：","");//将输入的内容赋给变量 name ，
			        //这里需要注意的是，prompt有两个参数，前面是提示的话，后面是当对话框出来后，在对话框里的默认值
			        if(val)//如果返回的有内容
			        {
			        	imSDK.refuseRoster(username,val);
			        }
			    }
			},
			onRemoveRoster:function(username){//删除好友
				$("#rosterlist span[jid = '"+username+"']").remove()
				if(account == username ){
					alert("好友已删除");
				}
			},
			onAgreeRoster:function(username){//同意好友
				$("#rosterlist").append("<span jid = '"+username+"'><a href='#'>"+username+"</a>&nbsp;&nbsp;<span style='cursor: pointer;'>删除</span></span><br/>");
//				alert("用户"+username +"已是你好友");
			},
			onRefuseRoster:function(username,reason){//拒绝好友
				alert("用户"+username +"已是拒绝你为好友原因："+reason);
			}
	};
	
	
	//要在建立连接执行
	imSDK.initialize("0001",account,{
		onConnecting:function(){
			$("#conn").html("正在连接。。。。。。");
		},
		onDisconnected:function(){
			$("#conn").html("断开连接。。。。。。<a id='con_cl' href='#'>重新连接</a>");
			$("#con_cl").click(function(){
				IMConnection();
			});
		},
		onConnected:function(){
			$("#conn").html("连接成功。。。。。。");
			init();
		}
	});
	
	
}


$(function(){
	IMConnection();
});