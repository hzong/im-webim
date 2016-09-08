/**
 * 渲染XMPP
 */
var imSDK = null;


function init(){
	$("#grouplist").html("");
	imSDK.getRoomList(function(obj,i){
		$("#grouplist").append("<span groupid = '"+obj.roomId+"' ><a href='#'>"+obj.name+"</a>&nbsp;&nbsp;<span style='cursor: pointer;'>删除</span></span><br/>");
		var span = $("#grouplist span[groupid="+obj.roomId+"]");
		span.find("a").click(function(){
			$("#to").val(obj.roomId);
			$("#zjyqrq_id").val(obj.roomId);
			$("#jjyqrq_id").val(obj.roomId);
			$("#tq_id").val(obj.roomId);
			$("#hqqcy_id").val(obj.roomId);
		});
			
		
		
	});
	$("#cjq_member").html("");
	$("#rosterlist").html("");
	imSDK.getRostersList(function(obj,i){
		$("#rosterlist").append("<span jid = '"+obj.localpartJid+"'><a href='#'>"+obj.localpart+"</a>&nbsp;&nbsp;<span style='cursor: pointer;'>删除</span></span><br/>");
		var span =  $("#rosterlist span[jid="+obj.localpartJid+"]");
		span.find("a").click(function(){
			$("#to").val(obj.localpartJid);
			$("#sqhy_text").val(obj.localpartJid);
		});
		span.find("span").click(function(){
			var jid = $(this).parent().attr("jid");
			imSDK.removeRoster(jid);
		});
		
		var str = "<input name = 'cjq_member_box'  type='checkbox' xm='"+obj.localpart+"' value='"+obj.localpartJid+"' />"+obj.localpart+" <br/>";
		$("#cjq_member").append(str);
		$("#zjyqrq_member").append(str);
		$("#jjyqrq_member").append(str);
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
	
	$("#zjyqrq").unbind('click');//解除绑定
	$("#zjyqrq").click(function(){
		var cjq_member = $("#zjyqrq_member").find("input:checked");
		
		var member =[]; 
		$.each(cjq_member,function(i,ele){
			member[member.length] = {"localpartJid":$(ele).val()};
		});
		
		imSDK.directInvitationMembers($("#zjyqrq_id").val(), member);
	});
	
	$("#jjyqrq").unbind('click');//解除绑定
	$("#jjyqrq").click(function(){
		var cjq_member = $("#jjyqrq_member").find("input:checked");
		
		$.each(cjq_member,function(i,ele){
			var obj = {
					roomId:$("#jjyqrq_id").val(),
					localpartJid:$(ele).val(),
					reason:"速度拉进群"
			};
			imSDK.mediatedInvitationMember(obj);
		});
		
	});
	$("#tq").unbind('click');//解除绑定
	$("#tq").click(function(){
			imSDK.exitRoom($("#tq_id").val());
		
	});
	$("#tcy").unbind('click');//解除绑定
	$("#tcy").click(function(){
			var member = [];
			var hqqcy_member = $("#hqqcy_member").find("input:checked");
			$.each(hqqcy_member,function(i,ele){
				member[member.length] = $(ele).val();
			});
		
			imSDK.removeRoomMembers({"roomId":$("#tq_id").val(),"membersJid":member,"reason":"非法"});
		
	});
	
	$("#xhq").unbind('click');//解除绑定
	$("#xhq").click(function(){
			imSDK.destroyRoom({"roomId":$("#tq_id").val(),"reason":"非法"});
	});
	
	
	$("#hqqcy").unbind('click');//解除绑定
	$("#hqqcy").click(function(){
			imSDK.getRoomMember($("#hqqcy_id").val());
		
	});
	
	
	
	$("#cjq").unbind('click');//解除绑定
	$("#cjq").click(function(){
		var cjq_name = $("#cjq_name").val();
		var cjq_ms = $("#cjq_ms").val();
		var cjq_member = $("#cjq_member").find("input:checked");
		var member =[]; 
		$.each(cjq_member,function(i,ele){
			member[member.length] = {"localpartJid":$(ele).val()};
		});
		
		
		imSDK.createRoom(cjq_name, cjq_ms,member);
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
	
	
	var addRoom = function(obj){
		$("#grouplist").append("<span groupid = '"+obj.roomId+"' ><a href='#'>"+obj.name+"</a>&nbsp;&nbsp;<span style='cursor: pointer;'>删除</span></span><br/>");
		var span = $("#grouplist span[groupid="+obj.roomId+"]");
		span.find("a").click(function(){
			$("#to").val(obj.roomId);
			$("#zjyqrq_id").val(obj.roomId);
			$("#jjyqrq_id").val(obj.roomId);
			$("#tq_id").val(obj.roomId);
			$("#hqqcy_id").val(obj.roomId);
		});
	};
	
	imSDK.RoomListen = {
			onCreateRoom:function(obj){
				addRoom(obj);
			},
			onDirectInvitation:function(obj){
				var str = "";
				var isexe = false;
				$.each(obj.members,function(i,member){
					str+=","+member.localpart;
					if(member.localpart == account){//成员包含自己则 添加群列表告知
						isexe = true;
					}
				});
				if(isexe){
					addRoom(obj);
				}
				alert("用户"+obj.from+"拉入:"+str.substring(1)+"入群"+obj.roomId);
			},
			onMediatedInvitation:function(obj){
				var req_obj = {};
				req_obj.roomId = obj.roomId;
				req_obj.localpartJid = obj.fromJid;
				if(confirm(obj.from+"邀请你进入"+obj.roomId+"群，描述："+obj.reason)){
					
					imSDK.agreeRoomInvite(obj);
				}else{
					req_obj.reason = "就不进";
					imSDK.declineRoomInvite(req_obj);
				}
			},
			onExitRoom:function(obj){
				if(obj.localpart == account){
					$("#grouplist span[groupid = '"+obj.roomId+"']").remove()
					alert("退群成功");
				}else{
					alert(obj.localpart+"退出"+obj.roomId+"群");
				}
			},
			onRoomMember:function(obj){
				$.each(obj,function(i,member){
					var str = "<input name = 'hqqcy_member_box'  type='checkbox' xm='"+member.localpart+"' value='"+member.localpartJid+"' />"+member.localpart+" <br/>";
					$("#hqqcy_member").append(str);
				});
			},
			onRemoveRoomMembers:function(obj){
				if(obj.localpart == account){
					$("#grouplist span[groupid = '"+obj.roomId+"']").remove();
					alert("退群成功");
				}else{
					alert(obj.localpart+"退出"+obj.roomId+"群");
				}
			},
			onRemoveRoomMembers:function(obj){
				$("#grouplist span[groupid = '"+obj.roomId+"']").remove();
					$.each(obj.members,function(i,item){
						$("#hqqcy_member input[value="+item.localpartJid+"]").remove();
					});
			},
			onDestroyRoom:function(obj){
				$("#grouplist span[groupid = '"+obj.roomId+"']").remove();
				alert("房间:"+obj.roomId+"解散了");
			}
			
			
	}
	
	
	imSDK.RosterListen = {
			onApplyRoster:function(username,reason){//申请好友
				if(confirm("来自"+username+"用户-请求加你为好友："+reason))
			    {
					imSDK.agreeRoster(username,username+(Math.random()*6 + 1),"好友列表");
//					imSDK.A
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
			onRemoveRoster:function(obj){//删除好友
				$("#rosterlist span[jid = '"+obj.localpartJid+"']").remove()
//				if(account == username ){
					alert("好友已删除");
//				}
			},
			onAgreeRoster:function(obj){//同意好友
				$("#rosterlist").append("<span jid = '"+obj.localpartJid+"'><a href='#'>"+obj.localpart+"</a>&nbsp;&nbsp;<span style='cursor: pointer;'>删除</span></span><br/>");
				var span =  $("#rosterlist span[jid="+obj.localpartJid+"]");
				span.find("a").click(function(){
					$("#to").val(obj.localpartJid);
					$("#sqhy_text").val(obj.localpartJid);
				});
				span.find("span").click(function(){
					var jid = $(this).parent().attr("jid");
					imSDK.removeRoster(jid);
				});
//				alert("用户"+username +"已是你好友");
			},
			onRefuseRoster:function(obj){//拒绝好友
				alert("用户"+obj.localpart +"已是拒绝你为好友原因："+obj.reason);
			}
	};
	
	
	//要在建立连接执行
	imSDK.initialize({
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
	
	imSDK.onConnect({
		"account":account,
		"password":"123",
		"source":"hz_chatim"
	});
	
	
}


$(function(){
	IMConnection();
});