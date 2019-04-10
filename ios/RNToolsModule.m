//
//  RNToolsModule.m
//  hbb
//
//  Created by bai jin on 2018/1/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNToolsModule.h"
#import "MBProgressHUD.h"
#import "AppDelegate.h"
#import "sys/utsname.h"
#import <AVFoundation/AVFoundation.h>

@implementation RNToolsModule
RCT_EXPORT_MODULE();

//导出事件名
- (NSDictionary *)constantsToExport{
  return @{@"VERSION_CODE": [RNToolsModule appBuild] ,
           @"VERSION_NAME": [RNToolsModule appVersion] ,
           @"TOAST_SHORT": @(1) ,
           @"TOAST_LONG": @(2) ,
           @"SYSTEM_INFO": @{@"os":@"ios",@"version":[UIDevice currentDevice].systemVersion,@"model":[RNToolsModule deviceType]},
           };
}

+ (NSString *)appVersion{
  NSDictionary *infoDic = [[NSBundle mainBundle] infoDictionary];
  NSString *version = infoDic[@"CFBundleShortVersionString"];
  return version;
}

+ (NSString *)appBuild{
  NSDictionary *infoDic = [[NSBundle mainBundle] infoDictionary];
  NSString *build = infoDic[@"CFBundleVersion"];
  return build;
}

RCT_EXPORT_METHOD(sleepScreenDisabled:(BOOL)b){
  [UIApplication sharedApplication].idleTimerDisabled = b;
}

RCT_EXPORT_METHOD(showToast:(NSString *)text delay:(nonnull NSNumber *)delay){
  dispatch_async(dispatch_get_main_queue(), ^{
    UIView *view = [[UIApplication sharedApplication].delegate window];
    MBProgressHUD *hud = [MBProgressHUD showHUDAddedTo:view animated:YES];
    hud.userInteractionEnabled = NO;
    // Configure for text only and offset down
    hud.mode = MBProgressHUDModeText;
    hud.labelText = text;
    hud.removeFromSuperViewOnHide = YES;
    [hud hide:YES afterDelay:[delay intValue]];
  });
}

+ (BOOL)requiresMainQueueSetup{
  return YES;
}


+ (NSString *)deviceType
{
  NSString *str = [UIDevice currentDevice].systemVersion;
  
  
  struct utsname systemInfo;
  uname(&systemInfo);
  NSString *deviceString = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
  if ([deviceString isEqualToString:@"iPhone3,1"])    return @"4";
  
  if ([deviceString isEqualToString:@"iPhone3,2"])    return @"4";
  
  if ([deviceString isEqualToString:@"iPhone3,3"])    return @"4";
  
  if ([deviceString isEqualToString:@"iPhone4,1"])    return @"4";
  
  if ([deviceString isEqualToString:@"iPhone5,1"])    return @"5";
  
  if ([deviceString isEqualToString:@"iPhone5,2"])    return @"5";
  
  if ([deviceString isEqualToString:@"iPhone5,3"])    return @"5";
  
  if ([deviceString isEqualToString:@"iPhone5,4"])    return @"5";
  
  if ([deviceString isEqualToString:@"iPhone6,1"])    return @"5";
  
  if ([deviceString isEqualToString:@"iPhone6,2"])    return @"5";
  
  if ([deviceString isEqualToString:@"iPhone7,1"])    return @"6p";
  
  if ([deviceString isEqualToString:@"iPhone7,2"])    return @"6";
  
  if ([deviceString isEqualToString:@"iPhone8,1"])    return @"6s";
  
  if ([deviceString isEqualToString:@"iPhone8,2"])    return @"6sp";
  
  if ([deviceString isEqualToString:@"iPhone8,4"])    return @"se";
  
  // 日行两款手机型号均为日本独占，可能使用索尼FeliCa支付方案而不是苹果支付
  
  if ([deviceString isEqualToString:@"iPhone9,1"])    return @"7";
  
  if ([deviceString isEqualToString:@"iPhone9,2"])    return @"7p";
  
  if ([deviceString isEqualToString:@"iPhone9,3"])    return @"7";
  
  if ([deviceString isEqualToString:@"iPhone9,4"])    return @"7p";
  
  if ([deviceString isEqualToString:@"iPhone10,1"])   return @"8";
  
  if ([deviceString isEqualToString:@"iPhone10,4"])   return @"8";
  
  if ([deviceString isEqualToString:@"iPhone10,2"])   return @"8p";
  
  if ([deviceString isEqualToString:@"iPhone10,5"])   return @"8p";
  
  if ([deviceString isEqualToString:@"iPhone10,3"])   return @"10";
  
  if ([deviceString isEqualToString:@"iPhone10,6"])   return @"10";
  
  if ([deviceString isEqualToString:@"i386"])         return @"Simulator";
  
  if ([deviceString isEqualToString:@"x86_64"])       return @"Simulator";
  
  
  
  return deviceString;
  
}

RCT_EXPORT_METHOD(getLocalFiles:(NSString *)prefix
                  fileType:(NSString *)fileType
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  NSFileManager *fileManager = [NSFileManager defaultManager];
   NSMutableArray *res = [NSMutableArray array];
  //在这里获取应用程序Documents文件夹里的文件及文件夹列表
  NSArray *documentPaths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentDir = [documentPaths objectAtIndex:0];
  documentDir = [documentDir stringByAppendingPathComponent:@"files"];
  if (prefix) {
    documentDir = [documentDir stringByAppendingPathComponent:prefix];
  }
  NSError *error = nil;
  NSArray *fileList = [[NSArray alloc] init];
  //fileList便是包含有该文件夹下所有文件的文件名及文件夹名的数组

  fileList = [fileManager contentsOfDirectoryAtPath:documentDir error:&error];
  if (!fileList) {
    resolve([RNToolsModule promiseDataWithCode:0 message:[NSString stringWithFormat:@"%@ is empty",documentDir] data:res]);
    return;
  }
  for (int i = 0; i<fileList.count; i++) {
    if ([fileList[i] hasPrefix:@"."]) {
      continue;
    }
    NSMutableDictionary *obj = [NSMutableDictionary dictionary];
    obj[@"duration"] = @([RNToolsModule durationWithVideo:[NSURL URLWithString:[documentDir stringByAppendingPathComponent:fileList[i]]]]);
    obj[@"path"] = [documentDir stringByAppendingPathComponent:fileList[i]];
    obj[@"name"] = fileList[i];
    [res addObject:obj];
  }
  resolve([RNToolsModule promiseDataWithCode:0 message:@"" data:res]);

}

//生成promise返回参数
+(NSDictionary *)promiseDataWithCode:(int)code message:(NSString *)message data:(id)data{
  NSString *resMsg = @"";
  if (message) {
    resMsg = message;
  }
  return @{@"code":@(code),@"message":resMsg,@"data":data};
}

+ (NSUInteger)durationWithVideo:(NSURL *)videoUrl{
  NSData *data = [[NSData alloc] initWithContentsOfFile:videoUrl.path];
  AVAudioPlayer* player = [[AVAudioPlayer alloc] initWithData:data error:nil];
  double duration = player.duration;
  AVAudioFormat* format = player.format;
  NSLog(@"音频时长:%lf",player.duration);
  NSLog(@"音频声道数:%u",format.channelCount);
  NSLog(@"采样频率==%lf",format.sampleRate);//默认为:25600,所以也是按照这个频率来计算的
//  duration = duration*(25600/format.sampleRate);
  return duration;
}
@end
