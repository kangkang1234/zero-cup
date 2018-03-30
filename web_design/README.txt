该项目使用python3.5作为后台语言，使用后台框架为django，
数据库为mysql
静态文件目录 account/static

网页目录 template/



运行方法：进入项目文件夹

①：安装阿里云短信发送SDK

cd sms_python3.5/aliyun-python-sdk-core

python setup.py install

cd sms_python3.5/aliyun-python-sdk-dysmsapi

python setup.py install


②：安装项目依赖

sudo apt-get install pip
pip install -r requirements.txt


③：配置mysql数据库

1) cd web_design/

2) 编辑settings.py 文件


DATABASES = {
  
  'default': {
        
      'ENGINE': 'django.db.backends.mysql',
       
      'NAME': 'web_design',   #数据库名
       
      'USER': 'root',    #用户名
        
      'PASSWORD': 'jiangxufeng', #密码
      
      'HOST': '127.0.0.1',  
      
      'PORT': '3306',
   
 }
}


④：在项目根目录，
python manage.py makemigrations

python manage.py migrate

python manage.py runserver


此时项目已经在本地服务器启动，进入127.0.0.1:8000即可访问

新建超级用户，

python manage.py createsuperuser

然后进入127.0.0.1:8000/admin登录即可




