using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class MonitorsController : ControllerBase
{
    [HttpGet]
    public string Get()
    {
        return "monitors";
    }
}