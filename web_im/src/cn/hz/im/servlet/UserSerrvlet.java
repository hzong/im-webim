package cn.hz.im.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/UserSerrvlet")
public class UserSerrvlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public UserSerrvlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String imAccount = request.getParameter("un");
		String password = request.getParameter("pwd");
		request.setAttribute("un", imAccount);
		request.setAttribute("pwd", password);
		
		 RequestDispatcher dispatcher = request.getRequestDispatcher("webapp/chat/index.jsp");    // 使用req对象获取RequestDispatcher对象
	        dispatcher.forward(request, response);      
		
		
	}

}
