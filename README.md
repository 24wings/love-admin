将组件进行封装
http请求 返回Response接口类型的数据,所以要封装http请求为自己的 RestHttp
并且要封装服务器的Api接口到客户端   api  =>  api rest


基础数据




```typescript
interface BaseDataType{
    _id: string;
}



interface Person  extends{

}

interface Response{
    state:0 | 1|2;
    issuccess:boolean;
    dat: any;
}

```