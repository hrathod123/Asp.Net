using FreeUP.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add DbContext for SQL Server
builder.Services.AddDbContext<myContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Register EmailService (ensure it's properly scoped)
builder.Services.AddScoped<EmailService>();

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 2 * 1024 * 1024; // 2MB
});
// Add session services
builder.Services.AddDistributedMemoryCache(); // In-memory cache for session data
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(60); // Set session timeout (adjust as needed)
    options.Cookie.HttpOnly = true; // Secure session cookie
    options.Cookie.IsEssential = true; // Ensure session works in GDPR-compliant mode
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// Ensure session is available before routing and middleware
app.UseSession();
app.UseRouting();

// Enable authentication (if using Identity or JWT-based authentication)
app.UseAuthentication();

// Custom middleware for session-based access control
app.UseMiddleware<SessionCheckMiddleware>();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
