using ChatRoomApp.Hubs;
using ChatRoomApp.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();

builder.Services.AddSingleton<IDictionary<string, UserConnection>>(options => new Dictionary<string, UserConnection>());

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseRouting();
app.UseCors();

app.MapHub<ChatHub>("/chat");

app.Run();
